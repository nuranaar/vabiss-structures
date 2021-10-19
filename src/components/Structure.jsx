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
} from "devextreme-react/tree-list";

const Structure = () => {
  const [list, setList] = useState(store._array);

  useEffect(() => {
    setList(store._array);
  }, []);

  const parentDataSource = {
    store: list.filter((item) => !item.parent_id),
    sort: "name",
  };

  //   const onEditorPreparing = (e) => {
  //     if (e.dataField === "id" && e.row.data.ID === 1) {
  //       e.cancel = true;
  //     }
  //   };
  //   const onSaving = (e) => {
  //     console.log(e.changes);
  //   };

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
        // onEditingStart={(e) => console.log("onEditingStart", e)}
        // onEditorPreparing={onEditorPreparing}
        // onSaving={onSaving}
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
          <RequiredRule />
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
