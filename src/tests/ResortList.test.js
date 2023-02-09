import { render, screen } from '@testing-library/react';
import ResortList from '../components/ResortList/ResortList';
import {resorts} from '../Resorts';


describe('ResortList component', () => {
  test('it renders ResortList with resort items', () => {
    render(<ResortList resorts={resorts}/>);

    expect(screen.getByTestId('resort-list' )).toBeInTheDocument();
    expect(screen.getAllByTestId('item-container').length>0).toBeTruthy;
    // expect(screen.getByText('Ski Resort 1')).toBeInTheDocument();
  });
  

})