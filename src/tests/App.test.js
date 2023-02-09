import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from '../App';

describe('App component', () => {
  test('renders the title of the website and main', () => {
    render(<App />);

    const title = screen.getByText(/Popular Ski Resorts/i);
    expect(title).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  //Snapshot tests to make sure UI does not change unexpectedly
  test("it renders a correct snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 })



