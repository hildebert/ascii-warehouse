import DateComponent from '../Date.js';

import React from 'react';
import chai, { assert } from 'chai';
import { shallow, mount } from 'enzyme';

describe('DateComponent', () => {
    it('Render 5 days ago', () => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        const component = shallow(<DateComponent source={date.toString()}/>);
        assert.equal(component.find('span').text(), '5 days ago');
    });

    it('Render full date', () => {
        const date = new Date(2010, 11, 11);
        const component = shallow(<DateComponent source={date.toString()}/>);
        assert.equal(component.find('span').text(), '2010-12-11, 00:00');
    });
});
