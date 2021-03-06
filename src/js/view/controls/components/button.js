import UI from 'utils/ui';
import svgParse from 'utils/svgParser';
import flagNoFocus from 'view/utils/flag-no-focus';

export default function (icon, apiAction, ariaText, svgIcons) {
    const element = document.createElement('div');
    element.className = 'jw-icon jw-icon-inline jw-button-color jw-reset ' + icon;
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');

    if (ariaText) {
        element.setAttribute('aria-label', ariaText);
    }

    element.style.display = 'none';

    if (apiAction) {
        new UI(element).on('click tap enter', function(event) {
            apiAction(event);
        });
    }

    // prevent button from having a border when focused through click
    flagNoFocus(element);

    if (svgIcons) {
        Array.prototype.forEach.call(svgIcons, svgIcon => {
            if (typeof svgIcon === 'string') {
                element.appendChild(svgParse(svgIcon));
            } else {
                element.appendChild(svgIcon);
            }
        });
    }

    return {
        element: function() {
            return element;
        },
        toggle: function(m) {
            if (m) {
                this.show();
            } else {
                this.hide();
            }
        },
        show: function() {
            element.style.display = '';
        },
        hide: function() {
            element.style.display = 'none';
        }
    };
}
