import sinon from 'sinon';
import pipe from '../pipe';

const defaultFilters = {
  test: {
    state: { text: 'js' },
    functor: (state, list) => list.filter(val => val.includes(state.text)),
  }
}

describe('pipe', () => {
  it('should not crashed with no filters',() => {
    expect(() => {
      pipe([], []);
    }).not.toThrow();
  });

  it('should apply filters', () => {
    const list = ['index.js', 'test.tx', 'new.js'];
    expect(pipe(list, defaultFilters))
      .toEqual(['index.js', 'new.js']);
  });

  it('should combine filters', () => {
    const list = ['index.js', 'test.tx', 'new.js'];
    const newFilter = {
      state: { text: 'tx' },
      functor: (state, list) => list.filter(val => val.includes(state.text)),
    }
    const allFilters = Object.assign({}, defaultFilters, { newFilter });
    expect(pipe(list, allFilters))
      .toEqual([]);
  });

  it('should call functors with state and list', () => {
    const spy = sinon.spy();
    const state = { test: 'test' };
    const list = ['test'];
    const filter = {
      functor: spy,
      state, 
    };
    pipe(list, { filter });
    expect(spy.calledWith(state, list))
      .toBe(true);
  });
});
