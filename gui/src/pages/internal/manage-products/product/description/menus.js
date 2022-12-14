export default [
  [
    {
      label: 'F',
      class: 'text-bold',
      onClickFnName: 'toggleBold',
      onClickParam: undefined,
      isActive: 'bold',
    },
    {
      label: 'K',
      class: 'text-italic',
      onClickFnName: 'toggleItalic',
      onClickParam: undefined,
      isActive: 'italic',
    },
    {
      label: 'U',
      class: 'text-underline',
      onClickFnName: 'toggleUnderline',
      onClickParam: undefined,
      isActive: 'underline',
    },
    {
      label: 'ab',
      class: 'text-strike',
      onClickFnName: 'toggleStrike',
      onClickParam: undefined,
      isActive: 'strike',
    },
    {
      label: 'li',
      onClickFnName: 'toggleBulletList',
      onClickParam: undefined,
      isActive: 'bulletList',
    },
    {
      label: '1.',
      onClickFnName: 'toggleOrderedList',
      onClickParam: undefined,
      isActive: 'orderedList',
    },
  ],
  [
    {
      label: 'H1',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 1 },
      isActive: 'heading',
      isActiveOption: { level: 1 },
    },
    {
      label: 'H2',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 2 },
      isActive: 'heading',
      isActiveOption: { level: 2 },
    },
    {
      label: 'H3',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 3 },
      isActive: 'heading',
      isActiveOption: { level: 3 },
    },
    {
      label: 'H4',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 4 },
      isActive: 'heading',
      isActiveOption: { level: 4 },
    },
    {
      label: 'H5',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 5 },
      isActive: 'heading',
      isActiveOption: { level: 5 },
    },
    {
      label: 'H6',
      onClickFnName: 'toggleHeading',
      onClickParam: { level: 6 },
      isActive: 'heading',
      isActiveOption: { level: 6 },
    },
  ],
]
