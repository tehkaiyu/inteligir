import React from 'react';
import renderer from 'react-test-renderer';
import { BlockLink } from '../index';

describe('BlockLink', () => {
  test('renders', () => {
    const json = renderer.create(<BlockLink>raw text</BlockLink>).toJSON();
    expect(json).toMatchSnapshot();
  });
});
