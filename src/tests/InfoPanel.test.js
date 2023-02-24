import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import {InfoPanel}  from '../components/InfoPanel/InfoPanel';
import store from '../app/store'
import { Provider } from 'react-redux'

describe('InfoPanel component', () => {
    test('it renders the InfoPanel with a className equal to the panel', () => {
    const {container} = render(<Provider store={store}><InfoPanel /></Provider>);

    expect(container.firstChild).toHaveClass('panel');
    });
    
    // test("it renders a correct snapshot", () => {
    //     const tree = renderer.create(<InfoPanel />).toJSON();
    //     expect(tree).toMatchSnapshot();
    //   });
})