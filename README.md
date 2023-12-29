In the project directory, you can run:
### `npm start`

node version --> v21.4

User Story

User can add a svg to the "Add SVG" button. 
On the right side, the list of svg elements will be displayed. 
By left-clicking, the child elements of the SVG will be shown. 
By right-clicking, the modal to edit SVG can be accessed. 


Edit SVG modal. 
In the edit section, the data of the selected element will be displayed (id, style, x, y, width, height). Below that, there is a table showing the respective added events. If there are no events, it will display 'No events found.' To add events, you need to use the 'Add events' button.


Add events modal. 
In the add events section, the ID of the element to which a new event will be added will be displayed. Below is a select option for the event type. There are three static events where the user can choose. If a specific event type has been selected for an element once, that event cannot be added again by becoming disabled.
Below is a checkbox button checked by default. If the user leaves the button checked, then a default alert event is added. If unchecked, the event below must be added.

After clicking the "Apply Changes" button, the event is added to the SVG element.

The data is stored in localStorage. If the page is reloaded, the events are still added. If you want to delete an event, the delete button is active, as well as the edit event button.

To remove the SVG, click on "Remove SVG"

Appropriate validations have been made to prevent adding an event if the element does not have an ID.