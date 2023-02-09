import { render, screen,fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";

import {resorts} from '../Resorts';
import {ResortListItem} from '../components/ResortList/ResortListItem';

const el = resorts[0];
console.log(el);

describe('ResortListItem component', () => {
    test('it renders ResortListItem with name and image', () => {
    render(<ResortListItem item={el} />);

    expect(screen.getByText(el.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    //   expect(screen.getAllByTestId('item-container').length).toBeTruthy;
    });

    test('test if the item info is displayed', () => {
        render(<ResortListItem item={el} />);
    
        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/location/i)).toBeInTheDocument();
        expect(screen.getByText(/number of ski runs/i)).toBeInTheDocument();
        });

    test('test if the two buttons are displayed', () => {
        render(<ResortListItem item={el} />);
    
        //expect(screen.getByText(el.name)).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        //   expect(screen.getAllByTestId('item-container').length).toBeTruthy;
        });

    test("should call edit callback when click Edit Button", () => {
        const handleEdit = jest.fn();
    
        const { getByTestId } = render(
        <ResortListItem item={el} handleEdit={handleEdit} />
        );
    
        fireEvent.click(getByTestId('edit'));
    
        expect(handleEdit).toHaveBeenCalled();
    });

    test("should call delete callback when click Delete Button", () => {
        const handleDelete = jest.fn();
    
        const { getByTestId } = render(
        <ResortListItem item={el} handleDelete={handleDelete} />
        );
    
        fireEvent.click(getByTestId('delete'));
    
        expect(handleDelete).toHaveBeenCalled();
    });
    
    // test("it renders a correct snapshot", () => {
    //     const tree = renderer.create(<ResortListItem item={{}}/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    //   });
    
})