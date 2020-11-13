import React, { Component } from 'react';
import {
    bool,
    func,
    number,
    object,
    oneOfType,
    shape,
    string,
} from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import i18n from '../i18n/i18n';

export default class ActiveDate extends Component {
    componentDidMount() {
        this.focusIfNeeded();
    }

    componentDidUpdate() {
        this.focusIfNeeded();
    }

    focusIfNeeded() {
        const { date, forceFocus, activeRef } = this.props;
        if (date.isFocus && forceFocus) {
            activeRef.current.focus();
        }
    }

    dateClassName() {
        const { date, isBlured } = this.props;
        const { isEnabled, isFocus, isSelected, isToday } = date;

        return classNames({
            'ffe-calendar__date': true,
            'ffe-calendar__date--today': isToday,
            'ffe-calendar__date--focus': isFocus && !isBlured,
            'ffe-calendar__date--disabled': !isEnabled,
            'ffe-calendar__date--selected': isSelected,
            'ffe-calendar__date--disabled-focus': !isEnabled && isFocus,
        });
    }

    tabIndex() {
        return this.props.date.isFocus ? 0 : -1;
    }

    render() {
        const { date, headers, onClick, locale, activeRef } = this.props;

        const timestamp = moment(date.timestamp);
        const year = timestamp.format('yyyy');
        const dayOfMonth = timestamp.format('DD');
        const monthName = i18n[locale][
            'MONTH_'.concat(timestamp.format('M'))
        ].toLowerCase();

        return (
            <td
                aria-disabled={!date.isEnabled}
                aria-selected={date.isSelected}
                className="ffe-calendar__day"
                headers={headers}
                onClick={() => onClick(date)}
                ref={activeRef}
                role="gridcell"
                date-number={date.date}
                tabIndex={this.tabIndex()}
            >
                <button
                    aria-label={`${dayOfMonth}. ${monthName} ${year}`}
                    className={this.dateClassName()}
                    tabIndex={-1}
                >
                    {date.date}
                </button>
            </td>
        );
    }
}

ActiveDate.propTypes = {
    date: shape({
        date: oneOfType([func, number]),
        isEnabled: bool,
        isFocus: bool,
        isSelected: bool,
        isToday: bool,
    }).isRequired,
    headers: string.isRequired,
    onClick: func.isRequired,
    forceFocus: bool.isRequired,
    locale: string.isRequired,
    activeRef: object,
    isBlured: bool.isRequired,
};
