# mofron-event-tap
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

tap event for mofron


# Install
```
npm install mofron mofron-event-tap
```

# Sample
```html
<setting>
    <tag load="mofron-comp-text">Text</tag>
    <tag load="mofron-event-tap">Tap</tag>
    <access-style>
        <mobile orientation=portrait>font-size:1500%;</mobile>
        <mobile orientation=landscape>font-size:800%;</mobile>
        <tablet>font-size:800%;</tablet>
        <default>font-size:625%;</default>
    </access-style>
</setting>

<script name=tap_evt run=init>
console.log("tap event");
</script>

<Text size=0.4rem event=Tap:@tap_evt>Tap Event</Text>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | taponly | boolean | true: ignore click,mouse event |
| | | | false: nothing to do |

