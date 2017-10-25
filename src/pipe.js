/**
 * Applies single filter for given list
 * @param  {Array<T>} list
 * @param  {(state: Object, list: Array<T>)} filter
 * @return {Array<T>}
 */
function applyFilter(list, filter) {
  return filter.functor(filter.state, list);
}
/**
 * Puts files trough filters
 * @param  {Array<T>} list
 * @param  {Object} filters
 * @return {Array<T>}
 */
export default function pipe(list, filters) {
  return Object.values(filters).reduce(applyFilter, list);
}
