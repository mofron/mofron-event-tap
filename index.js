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
            this.confmng().add("taponly", { type: "boolean", init:false });
            this.confmng().add("status", { type: "object", init:{ status:null,target:null } });
            
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
            let find_id = (dm, id) => {
                try {
                    if (dm.id() === id) {
                        return true;
                    }
                    let dm_chd = dm.child();
                    for (let idx in dm_chd) {
                        if (true === find_id(dm_chd[idx],id)) {
                            return true;
                        }
                    }
                    return false;
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
	    let touch_start = (e) => {
                try {
                    let tlist = e.changedTouches;
                    for (let tidx=0; tidx<tlist.length; tidx++) {
                        /* find touched dom */
                        if (true === find_id(dom, tlist[tidx].target.id)) {
                            /* hit */
                            evt_obj.status('start', tlist[tidx].target.id);
                            break;
                        }
                    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    };
            document.addEventListener("touchstart", touch_start, { passive: false });
            
            
            let touch_move = (e) => {
                try {
                    let tlist = e.changedTouches;
                    for (let tidx=0; tidx<tlist.length; tidx++) {
                        /* find touched dom */
                        if (true === find_id(dom, tlist[tidx].target.id)) {
                            /* hit */
                            evt_obj.status(null);
                            break;
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            document.addEventListener("touchmove", touch_move, { passive: false });
            
            
	    let touch_end = (e) => {
                try {
	            let tlist = e.changedTouches;
                    for (let tidx=0; tidx<tlist.length; tidx++) {
                        /* find touched dom */
                        if (true === find_id(dom, tlist[tidx].target.id)) {
                            /* hit */
                            let sts = evt_obj.status();
                            if (('start' === sts.status) && (tlist[tidx].target.id === sts.target)) {
                                evt_obj.execListener(e);
                            }
                            evt_obj.status(null);
                            break;
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    };
	    document.addEventListener("touchend", touch_end, { passive: false });

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    status (sts,tgt) {
        try {
            if (undefined === sts) {
                return this.confmng('status');
            } else if (null === sts) {
                this.confmng('status', { status:null, target:null });
            } else {
                this.confmng('status', { status:sts, target:tgt });
            }
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
