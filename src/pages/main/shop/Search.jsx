import React, { useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../hooks/useAxios";

function Category({onSearchResults}) {
  const { req } = useAxios();
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장

  // 카테고리 매핑 (1: 침대, 2: 의자 ...)
  const categoryMap = {
    "": null, // 선택 안 함
    "1": "침대",
    "2": "의자",
    "3": "책상",
    "4": "수납장",
    "5": "옷장",
    "6": "기타"
  };

  // 검색 실행 함수
  const handleSearch = async () => {
   

    const requestData = {
      tableName: "tbl_prod", // 검색 대상 테이블
      keyword: keyword,
      searchColumns: ["title"], // 상품명(title)만 검색
      sortColumn: "reg_date", // 최신 등록 순 정렬
      sortOrder: "DESC",
      category: category ? Number(category) : null // 카테고리를 숫자로 변환 (없으면 null)
    };

    const res = await req("post", "search", requestData);

    if (res) {
      console.log(" 검색 결과:", res);
      setSearchResults(res); // 검색 결과 저장
      onSearchResults(res);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 폼 제출 방지
      handleSearch();
    }
  };
  return (
    <Container className="p-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <InputGroup>
            {/* 카테고리 선택 */}
            <Form.Select
              className="custom-width"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">- 선택 -</option>
              {Object.entries(categoryMap)
                .filter(([key]) => key !== "")
                .map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
            </Form.Select>

            {/* 검색어 입력 */}
            <Form.Control
              type="text"
              placeholder="검색할 키워드를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            {/* 검색 버튼 */}
            <Button className="btn-hof" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>


    </Container>
  );
}

export default Category;
