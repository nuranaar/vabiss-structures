import React, { useState } from "react";
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
import { Template } from "devextreme-react/core/template";
import StatusSwitch from "./StatusSwitch";

import nextId from "react-id-generator";
import { store } from "../App";

const Structure = () => {
  const [list] = useState(store._array);
  const [editId, setEditId] = useState();
  const [status, setStatus] = useState(false);

  const parentDataSource = {
    store: list.filter((item) => !item.parent_id),
    sort: "name",
  };

  const equalNamesValidator = (e) => {
    const res = list
      .filter((item) => item.id !== editId)
      .map((item) => item.name === e.value);
    return res.every((r) => r === false);
  };

  const removeStructure = (id) => {
    store.remove(id);
    list
      .filter((item) => item.parent_id === id)
      .map((item) => removeStructure(item.id));
  };

  const onInsertItem = (e) => {
    store.insert({ ...e.data, status: status, id: nextId(`${list.length}`) });
  };

  const onUpdateItem = (e) => {
    store.update(e.key, e.newData);
  };

  return (
    <div className="table-section">
      <TreeList
        id="structure"
        dataSource={list}
        showRowLines={true}
        showBorders={true}
        autoExpandAll={true}
        keyExpr="id"
        parentIdExpr="parent_id"
        onEditingStart={(e) => setEditId(e.data.id)}
        onOptionChanged={(e) => console.log(e)}
        onRowRemoving={(e) => removeStructure(e.key)}
        onRowUpdating={onUpdateItem}
        onRowInserting={onInsertItem}
      >
        <Editing
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          useIcons={true}
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
            message="This name already exist."
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
        <Column
          dataField="status"
          caption="Status"
          cellTemplate="statusSwith"
          editCellRender={(e) => (
            <StatusSwitch options={e} store={store} status={setStatus} />
          )}
        ></Column>
        <Template
          render={(e) => <StatusSwitch options={e} store={store} />}
          name="statusSwith"
        />

        {/* Buttons column  */}
        <Column type="buttons">
          <Button name="edit" cssClass="icon-pencil"></Button>
          <Button cssClass="icon-bin2" name="delete"></Button>
          <Button cssClass="icon-checkbox-checked" name="save"></Button>
          <Button cssClass="icon-cross" name="cancel"></Button>
        </Column>
      </TreeList>
    </div>
  );
};

export default Structure;
