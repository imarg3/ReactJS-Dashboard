import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../views/SignUp';
import { shallow, configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('testing SignUp Compoenent', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<SignUp debug />);
    });

    test('should not return an error and should render correctly in "debug" mode', () => {
        expect(wrapper).toMatchSnapshot();
    });
});