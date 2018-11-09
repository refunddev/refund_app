const modalGridView = [
      {
        id:"101",
        data:{
          columns:[{
            title: 'Name',
            dataIndex: 'name'
          }, {
            title: 'Age',
            dataIndex: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
          }],
          values:dataSourcex
        },

      },{
        id:"102",
        data:{
          columns:[{
            title: 'Name',
            dataIndex: 'name'
          }, {
            title: 'Age',
            dataIndex: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
          }, {
            title: 'Column2',
            dataIndex: 'surname',
          }],
          values:dataSourcex
        },

      }
    ];
<ModalGridView visible={true} dataSource={modalGridView}/>

