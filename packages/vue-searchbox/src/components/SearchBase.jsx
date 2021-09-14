import { SearchBase as Headless } from '@appbaseio/searchbase-mongodb';
import VueTypes from 'vue-types';
import { types } from '../utils/types';

const SearchBase = {
	name: 'search-base',
	props: {
		index: VueTypes.string,
		url: types.url,
		mongodb: VueTypes.object,
		credentials: VueTypes.string,
		headers: types.headers,
		appbaseConfig: types.appbaseConfig,
		transformRequest: VueTypes.func,
		transformResponse: VueTypes.func
	},
	provide() {
		this.searchbase = new Headless({
			index: this.$props.index,
			url: this.$props.url,
			mongodb: this.$props.mongodb,
			credentials: this.$props.credentials,
			headers: this.$props.headers,
			appbaseConfig: this.$props.appbaseConfig,
			transformRequest: this.$props.transformRequest,
			transformResponse: this.$props.transformResponse
		});
		return {
			searchbase: this.searchbase
		};
	},
	render() {
		return <div>{this.$slots.default}</div>;
	}
};

SearchBase.install = function(Vue) {
	Vue.component(SearchBase.name, SearchBase);
};

export default SearchBase;
