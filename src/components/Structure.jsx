import React, { useState, useEffect } from "react";
import { store } from "../App";
import {
  TreeList,
  Editing,
  Column,
  RequiredRule,
  Lookup,
  Button,
  Paging,
  Pager,
  SearchPanel,
  Sorting,
  Scrolling,
  HeaderFilter,
  StringLengthRule,
  PatternRule,
  CustomRule,
} from "devextreme-react/tree-list";
import { Validator } from "devextreme-react";

const Structure = () => {
  const [list, setList] = useState(store._array);
  const [editId, setEditId] = useState();

  useEffect(() => {
    setList(store._array);
  }, []);

  const parentDataSource = {
    store: list.filter((item) => !item.parent_id),
    sort: "name",
  };

  const onEditorPreparing = (e) => {
    if (e.dataField === "id" && e.row.data.ID === 1) {
      e.cancel = true;
    }
    // console.log("onEditorPreparing", e);
  };
  const equalNamesValidator = (e) => {
    const res = store._array
      .filter((item) => item.id !== editId)
      .map((item) => item.name === e.value);
    return res.every((r) => r === false);
  };

  return (
    <div className="table-section">
      <TreeList
        id="employees"
        dataSource={list}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        autoExpandAll={true}
        keyExpr="id"
        parentIdExpr="parent_id"
        onEditorPreparing={onEditorPreparing}
        onEditingStart={(e) => setEditId(e.data.id)}
      >
        <Editing
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          mode="row"
        />

        <HeaderFilter visible={true} />

        <SearchPanel visible={true} />

        <Sorting mode="multiple" />

        <Scrolling mode="standard" />
        <Paging enabled={true} defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10]}
          showInfo={true}
        />

        {/* Name column  */}
        <Column dataField="name" defaultSortOrder="asc">
            <StringLengthRule
              min={3}
              max={30}
              message="Min length: 3, Max length: 30"
            />
            <PatternRule pattern="^[a-zA-Z]" message="Do not use digits." />
            <RequiredRule />
            <CustomRule
              validationCallback={equalNamesValidator}
              message="This name allready exist."
            />
        </Column>

        {/* Parent Id column  */}
        <Column dataField="parent_id" caption="Parent Id">
          <Lookup
            dataSource={parentDataSource}
            valueExpr="id"
            displayExpr="id"
          />
        </Column>

        {/* Status column  */}
        <Column dataField="status" caption="Status"></Column>

        {/* Buttons column  */}
        <Column type="buttons">
          <Button name="edit"></Button>
          <Button name="delete"></Button>
        </Column>
      </TreeList>
    </div>
  );
};

export default Structure;
