import { render, screen } from '@testing-library/react';
import ResortList from '../components/ResortList/ResortList';
import {resorts} from '../Resorts';

import store from '../app/store'
import { Provider } from 'react-redux'

describe('ResortList component', () => {
  test('it renders ResortList with resort items', () => {
    render(
      <Provider store={store}>
        <ResortList resorts={resorts}/>
      </Provider>
    );

    expect(screen.getByTestId('resort-list' )).toBeInTheDocument();
    expect(screen.getAllByTestId('item-container').length>0).toBeTruthy;
    // expect(screen.getByText('Ski Resort 1')).toBeInTheDocument();
  });
  

})