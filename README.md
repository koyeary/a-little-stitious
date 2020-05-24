# Weather Dashboard

A jQuery weather dashboard using the Open Weather Map API. Using a search form, pull up the current weather conditions and the forecast for the next five days of any given city. Search  history appears on the left for easy navigation to previous searches.

## Acceptance Criteria

Using a search form, pull up the current and future weather conditions for a given city.

Site displays that last searched city on load. 

Using the search form, or clicking on any city in the search history, displays the current weather conditions and conditions for the next five days.

UV Index is indicated both numerically and using a color-coded icon.


## Issues

Search history buttons appear only after page is manually refreshed, buttons still don't reload every time a new city is selected. 

LocalStorage is unreliable for chronoligical storing. Cookies would be better.

The date (dt) key in the Open Call object only represents time of day, so dates are not present on the forecast tiles.
