import * as types from './types';
import Observable from './Observable';
import Base from './Base';
import Results from './Results';
import Aggregations from './Aggregations';
import SearchBase from './SearchBase';

export class Component extends Base {
  // RS API properties
  id: string;

  type: types.QueryType;

  react: Object;

  queryFormat: types.QueryFormat;

  dataField: string | Array<string | types.DataField>;

  categoryField: string;

  categoryValue: string;

  nestedField: string;

  from: number;

  size: number;

  sortBy: types.SortType;

  value: any;

  aggregationField: string;

  after: Object;

  includeNullValues: Boolean;

  includeFields: Array<string>;

  excludeFields: Array<string>;

  fuzziness: string | number;

  searchOperators: boolean;

  highlight: boolean;

  highlightField: string | Array<string>;

  customHighlight: Object;

  interval: number;

  aggregations: Array<string>;

  missingLabel: string;

  showMissing: boolean;

  defaultQuery: (component: Component) => void;

  customQuery: (component: Component) => void;

  execute: boolean;

  enableSynonyms: boolean;

  selectAllLabel: string;

  pagination: boolean;

  queryString: boolean;

  // other properties

  // To enable the query suggestions
  enableQuerySuggestions: boolean;

  // To show the distinct suggestions
  showDistinctSuggestions: boolean;

  // query error
  error: any;

  // state changes subject
  stateChanges: Observable;

  // request status
  requestStatus: types.RequestStatus;

  // results
  results: Results;

  // aggregations
  aggregationData: Aggregations;

  /* ------ Private properties only for the internal use ----------- */
  _parent: SearchBase;

  // Counterpart of the query
  _query: Object;

  // TODO: Check on the below properties
  // mic status
  _micStatus: types.MicStatusField;

  // mic instance
  _micInstance: any;

  // query search ID
  _queryId: string;

  /* ---- callbacks to create the side effects while querying ----- */

  beforeValueChange: (value: string) => Promise<any>;

  /* ------------- change events -------------------------------- */

  // called when value changes
  onValueChange: (next: string, prev: string) => void;

  // called when results change
  onResults: (next: string, prev: string) => void;

  // called when composite aggregations change
  onAggregationData: (next: Array<Object>, prev: Array<Object>) => void;

  // called when there is an error while fetching results
  onError: (error: any) => void;

  // called when request status changes
  onRequestStatusChange: (next: string, prev: string) => void;

  // called when query changes
  onQueryChange: (next: string, prev: string) => void;

  // called when mic status changes
  onMicStatusChange: (next: string, prev: string) => void;

  constructor({
    index,
    url,
    credentials,
    appbaseConfig,
    headers,
    transformRequest,
    transformResponse,
    beforeValueChange,
    enableQuerySuggestions,
    results,
    ...rsAPIConfig
  }: types.ComponentConfig);

  // getters
  micStatus: types.MIC_STATUS;

  micInstance: Object;

  micActive: boolean;

  micInactive: boolean;

  micDenied: boolean;

  query: string;

  requestPending: boolean;

  appbaseSettings: types.AppbaseSettings;

  // Method to get the raw query based on the current state
  componentQuery: Object;

  queryId(): string;

  /* -------- Public methods -------- */

  // mic click handler
  onMicClick(micOptions: Object, options: types.Options): void;

  // Method to set the dataField option
  setDataField(
    dataField: string | Array<string | types.DataField>,
    options?: types.Options
  ): void;

  // To set the parent (SearchBase) instance for the component
  setParent(parent: SearchBase): void;

  // Method to set the value
  setValue(value: any, options?: types.Options): void;

  // Method to set the size option
  setSize(size: number, options?: types.Options): void;

  // Method to set the from option
  setFrom(from: number, options?: types.Options): void;
  // Method to set the fuzziness option
  setFuzziness(fuzziness: number | string, options?: types.Options): void;

  // Method to set the includeFields option
  setIncludeFields(includeFields: Array<string>, options?: types.Options): void;

  // Method to set the excludeFields option
  setExcludeFields(excludeFields: Array<string>, options?: types.Options): void;

  // Method to set the sortBy option
  setSortBy(sortBy: string, options?: types.Options): void;

  // Method to set the sortBy option
  setReact(react: Object, options?: types.Options): void;

  // Method to set the default query
  setDefaultQuery(
    defaultQuery: (component: Component) => void,
    options?: types.Options
  ): void

  // Method to set the custom query
  setCustomQuery(
    customQuery: (component: Component) => void,
    options?: types.Options
  ): void

  // Method to execute the component's own query i.e default query
  triggerDefaultQuery(options?: types.Option): Promise<any>;

  // Method to execute the query for watcher components
  triggerCustomQuery(options?: types.Option): Promise<any>;

  // To get the parsed suggestions from the results
  getSuggestions(): Array<Object>;

  getSuggestionsQuery(): Object;

  // use this methods to record a search click event
  recordClick(objects: Object, isSuggestionClick?: boolean): void;

  // use this methods to record a search conversion
  recordConversions(objects: Array<string>): void;

  // Method to subscribe the state changes
  subscribeToStateChanges(
    fn: Function,
    propertiesToSubscribe?: string | Array<string>
  ): void;

  // Method to unsubscribe the state changes
  unsubscribeToStateChanges(fn?: Function): void;
}

export default Component;
