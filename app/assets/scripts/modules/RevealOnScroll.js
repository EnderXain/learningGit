import $ from 'jquery';
import wp from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
    constructor( el, offset ){
        this.itemsToReveal = el;
        this.offset = offset;
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass('reveal-item');
    }

    createWaypoints(){
        let that = this;
        this.itemsToReveal.each(function(){
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offset
            });
        });
    }
}

export default RevealOnScroll;