/**
 * @file mofron-event-tap/index.js
 * @brief tap event for mofron
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("Tap");
	    
            /* init config */
            this.confmng().add("taponly", { type: "boolean" });
            let dev = comutl.accdev();
            if (('mobile' === dev) || ('tablet' === dev)) {
                this.confmng("taponly", true);
	    } else {
                this.confmng("taponly", false);
	    }
	    
	    /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * event contents
     * 
     * @param (mofron.class.dom) target dom object
     * @type private
     */
    contents (dom) {
        try {
            let evt_obj = this;
	    let touch = (e) => {
	        try {
		    if (true === evt_obj.taponly()) {
		        e.preventDefault();
                    }
		    let tlist = e.changedTouches;
		    for (let tidx=0; tidx < tlist.length; tidx++) {
                        if (dom.id() === tlist[tidx].target.id) {
			    evt_obj.execListener(e);
			    break;
			}
                    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    }
            document.addEventListener("touchstart", touch, { passive: false });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tap only flag
     * 
     * @param (boolean) true: ignore click,mouse event
     *                  false: nothing to do
     * @return (boolean) flag status
     * @type parameter
     */
    taponly (prm) {
        try {
            return this.confmng("taponly", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
