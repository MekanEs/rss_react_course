import React, { ChangeEvent } from 'react';
import Header from './components/header/header';
import { getItems, responsetype } from './API/getItems/getItems';
import ItemList from './components/itemList/itemList';
import Loader from './components/loader/loader';

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
  background: string;
  hasError: boolean;
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
      background: 'linear-gradient(180deg, #241d1d 0%, #213038 100%)',
      hasError: false,
    };
    this.setBackground = this.setBackground.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setIsPending = this.setIsPending.bind(this);
    this.setItems = this.setItems.bind(this);
    this.search = this.search.bind(this);
  }
  setBackground: (url: string) => void = (url) => {
    this.setState({ ...this.state, background: `url(${url})` });
    console.log(this.state.background);
  };
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
  errorFunc: () => void = () => {
    this.setState({ ...this.state, hasError: true });
  };

  componentDidMount(): void {
    this.search();
  }

  render() {
    if (this.state.hasError) {
      throw new Error('Something is wrong');
    }
    return (
      <div className="app" style={{ background: `${this.state.background}` }}>
        <Header
          searchQuery={this.state.searchValue}
          setSearchQuery={this.setSearchQuery}
          search={this.search}
          error={this.errorFunc}
        />
        <section className="main-section">
          {this.state.isPending ? (
            <Loader />
          ) : (
            <ItemList
              items={this.state.itemsArr}
              setBackground={this.setBackground}
            />
          )}
        </section>
      </div>
    );
  }
}

export default App;
