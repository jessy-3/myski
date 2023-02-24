import { render, screen,fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";

import {resorts} from '../Resorts';
import {ResortListItem} from '../components/ResortList/ResortListItem';

import store from '../app/store'
import { Provider } from 'react-redux'

const el = resorts[0];
console.log(el);

describe('ResortListItem component', () => {
    test('it renders ResortListItem with name and image', () => {
    render(
        <Provider store={store}>
            <ResortListItem item={el} />
        </Provider>
        );

    expect(screen.getByText(el.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    //   expect(screen.getAllByTestId('item-container').length).toBeTruthy;
    });

    test('test if the item info is displayed', () => {
        render(
        <Provider store={store}>
            <ResortListItem item={el} />
        </Provider>
        );
    
        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/location/i)).toBeInTheDocument();
        expect(screen.getByText(/number of ski runs/i)).toBeInTheDocument();
        });

    test('test if the two buttons are displayed', () => {
        render(
            <Provider store={store}>
                <ResortListItem item={el} />
            </Provider>
            );
    
        //expect(screen.getByText(el.name)).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        //   expect(screen.getAllByTestId('item-container').length).toBeTruthy;
        });

    test("should call edit callback when click Edit Button", () => {
        const handleEdit = jest.fn();
    
        const { getByTestId } = render(
            <Provider store={store}>
                <ResortListItem item={el} handleEdit={handleEdit} />
            </Provider>
        );
    
        fireEvent.click(getByTestId('edit'));
    
        expect(handleEdit).toHaveBeenCalled();
    });

    test("should call delete callback when click Delete Button", () => {
        const handleDelete = jest.fn();
    
        const { getByTestId } = render(
            <Provider store={store}>
                <ResortListItem item={el} handleDelete={handleDelete} />
            </Provider>
        );
    
        fireEvent.click(getByTestId('delete'));
    
        expect(handleDelete).toHaveBeenCalled();
    });
    
    // test("it renders a correct snapshot", () => {
    //     const tree = renderer.create(<ResortListItem item={{}}/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    //   });
    
})