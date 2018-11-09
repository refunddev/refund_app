
const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({
        id: i,
        name: 'a' + i,
      });
    }

    this.state = {
     filterForm: [
             {
               name: 'date_payment',
               label: 'Дата платежа',
               type: 'betweenDate',
             },
             {
               name: 'knp',
               label: 'КНП',
               type: 'text',
             },
             {
               name: 'bin',
               label: 'БИН',
               type: 'text',
             },
             {
               name: 'status',
               label: 'Статусы',
               type: 'multibox',
               store: children,
             },
             {
               name: 'city',
               label: 'Город',
               type: 'combobox',
               store: children,
             },
           ]
    }

<GridFilter
clearFilter={()=>{}}
applyFilter={()=>{}}
filterForm={this.state.filterForm}
dateFormat={dateFormat}/>
