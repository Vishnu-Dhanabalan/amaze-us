import React from "react";
import styled from "styled-components";
import { Select, Input, Menu, Dropdown } from "antd";

import colorCodes from "../styles/color-codes";
import { device } from "../styles/breakpoints";

const { Search } = Input;
const { Option } = Select;
const { SubMenu } = Menu;

const SearchAreaWrapper = styled.div`
  background: ${colorCodes.areYaYellow};

  display: flex;
  flex-direction: row;

  padding: 20px 100px 20px 100px;
  margin: 0 auto;
  text-align: center;
  justify-content: space-between;

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    padding: 10px 50px 10px 50px;
  }
`;

SearchAreaWrapper.displayName = "SearchAreaWrapper";

const ArtistSortOptions = (setSortType: Function) => {
  const items = {
    Popularity: ["Low to High", "High to low"],
    Name: ["A - Z", "Z - A"]
  };

  const itemkeys = Object.keys(items);
  return (
    <Menu style={{ fontFamily: "BitterRegular" }} id="artistSortOptions">
      {itemkeys.map(eachItem => (
        <SubMenu title={eachItem} style={{ width: 150 }}>
          {items[eachItem].map(eachSubItem => (
            <Menu.Item
              style={{ fontFamily: "BitterRegular" }}
              onClick={key => {
                setSortType(key, "artist");
              }}
            >
              {eachSubItem}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

const TrackSortOptions = setSortType => {
  const items = {
    Title: ["A - Z", "Z - A"],
    LyricsCount: ["Low to High", "High to low"],
    Rating: ["Lowest to Highest", "Highest to lowest"],
    Popularity: ["Low to High", "High to low"],
    Name: ["A - Z", "Z - A"]
  };

  const itemkeys = Object.keys(items);
  return (
    <Menu style={{ fontFamily: "BitterRegular" }} id="artistSortOptions">
      {itemkeys.map(eachItem => (
        <SubMenu title={eachItem} style={{ width: 150 }}>
          {items[eachItem].map(eachSubItem => (
            <Menu.Item
              style={{ fontFamily: "BitterRegular" }}
              onClick={key => {
                setSortType(key, "track");
              }}
            >
              {eachSubItem}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export function useSearchType(value) {
  const [searchType, setSearchType_] = React.useState(value);
  const setSearchType = value => setSearchType_(value);
  return [searchType, setSearchType];
}

interface SearchComponentProps {
  searchTriggered: Function;
  setSortType: Function;
}

const SearchComponent: React.FC<SearchComponentProps> = props => {
  const [searchType, setSearchType] = useSearchType("artist");
  return (
    <div>
      <SearchAreaWrapper>
        <Select
          bordered={false}
          defaultValue={searchType}
          style={{
            borderRadius: 15,
            fontFamily: "BitterRegular",
            background: "#cadeed"
          }}
          dropdownStyle={{ fontFamily: "BitterRegular" }}
          onChange={value => {
            setSearchType(value);
          }}
          value={searchType}
        >
          <Option value="artist">Artist</Option>
          <Option value="track">Track</Option>
        </Select>
        <Search
          placeholder="Search for your favorite artists or tracks"
          onSearch={value => {
            if (value != "") {
              let param;
              if (searchType === "artist") {
                param = {
                  name: value,
                  pageSize: "30"
                };
              } else {
                param = {
                  name: value,
                  pageSize: "30",
                  lyricsRequired: true
                };
              }
              props.searchTriggered(searchType, param);
            }
          }}
          style={{ borderRadius: 15 }}
        />
        <Dropdown
          overlay={
            searchType === "track"
              ? TrackSortOptions(props.setSortType)
              : ArtistSortOptions(props.setSortType)
          }
        >
          <button
            style={{
              textDecoration: "none",
              fontSize: 15,
              width: 100,
              background: "#cadeed",
              borderRadius: "15px"
            }}
          >
            Sort
          </button>
        </Dropdown>
      </SearchAreaWrapper>
    </div>
  );
};

export default SearchComponent;
