import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader{
    constructor(){
        this.lazyImages = $('.lazyload');   //used to fix broken waypoints break points when images aren't loaded to take up vertical space
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }

    refreshWaypoints(){
        this.lazyImages.on('load', function(){
            Waypoint.refreshAll();      //waypoints is a global object so it will refresh everything. this means we don't need to do this in revealonscroll.js
        });
    }

    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint(){
        let that = this;
        new Waypoint({
            element: that.headerTriggerElement[0],
            handler: function(direction){
                if( direction == 'down' )
                    that.siteHeader.addClass('site-header--dark');
                else
                    that.siteHeader.removeClass('site-header--dark');
            }
        });
    }

    createPageSectionWaypoints(){
        let that = this;
        this.pageSections.each(function(){
            let currentEl = this;
            new Waypoint({
                element: currentEl,
                handler: function( direction ){
                    if( direction == 'down' )
                    {
                        let matchingHeaderLink = $(currentEl).attr( 'data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '18%'
            });

            new Waypoint({
                element: currentEl,
                handler: function( direction ){
                    if( direction == 'up' )
                    {
                        let matchingHeaderLink = $(currentEl).attr( 'data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '-40%'
            });
        });
    }
}

export default StickyHeader;