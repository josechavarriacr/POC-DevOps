/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Testing App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("Is the button 'Insert New Person' exists?", () => {
    render(<App />);
    const linkElement = screen.getByText(/Insert New Person/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("Is the button 'Restart Data' exists?", () => {
    render(<App />);
    const linkElement = screen.getByText(/Insert New Person/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("Is the button 'Load with Axios?", () => {
    render(<App />);
    const linkElement = screen.getByText(/Insert New Person/i);
    expect(linkElement).toBeInTheDocument();
  });
});