import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import {InfoPanel}  from '../components/InfoPanel/InfoPanel';

describe('InfoPanel component', () => {
    test('it renders the InfoPanel with a className equal to the panel', () => {
    const {container} = render(<InfoPanel />);

    expect(container.firstChild).toHaveClass('panel');
    });
    
    // test("it renders a correct snapshot", () => {
    //     const tree = renderer.create(<InfoPanel />).toJSON();
    //     expect(tree).toMatchSnapshot();
    //   });
})