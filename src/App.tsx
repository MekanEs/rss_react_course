import React, { ChangeEvent } from 'react';
import Header from './components/header/header';
import { getItems, responsetype } from './API/getItems/getItems';
import ItemList from './components/itemList/itemList';

export const SEARCH_VALUE_KEY = 'search_value';
export type SetSearchQuerytype = (e: ChangeEvent<HTMLInputElement>) => void;
export type itemtype = {
  name: string;
  description: string[];
  poster: { previewUrl: string; url: string };
  id: string;
};
export type itemsArrtype = itemtype[];
type AppStatetype = {
  searchValue: string;
  itemsArr: itemsArrtype;
  isPending: boolean;
  limit: number;
  page: number;
  pages: number | null;
  total: number | null;
};

class App extends React.Component<object, AppStatetype> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem(SEARCH_VALUE_KEY) || '',
      itemsArr: [],
      isPending: false,
      limit: 10,
      page: 1,
      pages: null,
      total: null,
    };

    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setIsPending = this.setIsPending.bind(this);
    this.setItems = this.setItems.bind(this);
    this.search = this.search.bind(this);
  }

  setIsPending: (value: boolean) => void = (value) => {
    this.setState({
      ...this.state,
      isPending: value,
      searchValue: this.state.searchValue.trim(),
    });
  };

  setSearchQuery: SetSearchQuerytype = (e) => {
    this.setState({ ...this.state, searchValue: e.target.value });
  };

  setItems = (arr: itemsArrtype) => {
    this.setState({
      ...this.state,
      itemsArr: arr,
      isPending: false,
    });
  };

  search: () => void = async () => {
    this.setIsPending(true);
    localStorage.setItem(SEARCH_VALUE_KEY, this.state.searchValue);
    const response: responsetype = await getItems(
      this.state.searchValue,
      this.state.page
    );
    this.setItems(response.docs);
  };
  errorFunc: () => void = async () => {
    const response = await getItems(this.state.searchValue, this.state.page);
    this.setItems(response.docs);
  };

  componentDidMount(): void {
    this.search();
  }

  render() {
    return (
      <div className="app">
        <Header
          searchQuery={this.state.searchValue}
          setSearchQuery={this.setSearchQuery}
          search={this.search}
          error={this.errorFunc}
        />

        <ItemList items={this.state.itemsArr} />
      </div>
    );
  }
}

export default App;
