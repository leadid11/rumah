exit_intent_popup_starter(function() {
    var addEvent = function(obj, evt, fn) {
        if (obj.addEventListener) obj.addEventListener(evt, fn, false)
        else if (obj.attachEvent) obj.attachEvent('on' + evt, fn)
    }
    addEvent(document, 'mouseout', function(event) {
        event = event ? event : window.event
        var from = event.relatedTarget || event.toElement
        if ((!from || from.nodeName == 'HTML') && event.clientY <= 100) {
            exit_intent_show_modal()
        }
    })
})