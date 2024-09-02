import { render, screen, fireEvent } from '@testing-library/react';
import { Searchform } from './SearchForm';

describe('SearchForm', () => {
  it('renders an empty input with the proper Label text', () => {
    render(<Searchform />);
    const input = screen.getByLabelText('Search for a movie:');
    expect(input).toHaveTextContent('');
  });

  it('renders an unchecked checkbox by default', () => {
    render(<Searchform />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.checked).toEqual(false);
  });

  it('changes the checkbox status after being clicked', () => {
    render(<Searchform />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
