const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  // ReactSelect: { value: "vanilla", label: "Vanilla" },
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  numberFormat: 123456789,
  // AntdInput: "Test",
  // AntdCheckbox: true,
  // AntdSwitch: true,
  // AntdSlider: 20,
  // AntdRadio: 1,
  downShift: "apple",
  // ReactDatepicker: new Date(),
  // AntdSelect: "",
  // DraftJS: EditorState.createEmpty(),
  Date: new Date(),
  // country: { code: "AF", label: "Afghanistan", phone: "93" },
  // ChakraSwitch: true,
  // reactMaskInput: ""
};

export const TAGS = ["吃饭", "食材", "房租", "水电", "衣服", "护肤品", "日用品"];

export const PERSONAL_TABLE_HEAD = [
  { id: 'date', label: '日期', alignRight: false },
  { id: 'tag', label: '类型', alignRight: false },
  { id: 'amount', label: '金额', alignRight: false },
  { id: 'description', label: '描述', alignRight: false },
  { id: '' }
];

export const COLLECTION_TABLE_HEAD = [
  { id: 'date', label: '日期', alignRight: false },
  { id: 'tag', label: '类型', alignRight: false },
  { id: 'amount', label: '人均金额', alignRight: false },
  { id: 'split', label: '均摊对象', alignRight: false },
  { id: 'description', label: '描述', alignRight: false },
  { id: 'isCollected', label: '已收回', alignRight: false  },
  { id: '' }
];

export default defaultValues;