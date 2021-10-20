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

  const equalNamesValidator = (e) => {
    const res = store._array
      .filter((item) => item.id !== editId)
      .map((item) => item.name === e.value);
    return res.every((r) => r === false);
  };

  const onRemove = (e) => {
    store.remove(e.key);
    store._array
      .filter((item) => item.parent_id === e.key)
      .map((item) => store.remove(item.id));
  };

  const onSave = (e) => {
    let changes = e.changes[0];
    console.log(changes);
    if (changes.type === "update") {
      store.update(changes.key, changes.data)
    } else if (changes.type === "incert") {
      store.insert(changes.data)
    }
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
        onSaved={onSave}
        onRowRemoving={onRemove}
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
        <Column dataField="status" caption="Status"></Column>

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
