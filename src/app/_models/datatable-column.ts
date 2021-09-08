export class DataTableColumn {
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: { value: string, regex: boolean };
    visible: boolean;

    constructor(data, name, searchable, orderable, search, visible = true) {
        this.data = data;
        this.name = name;
        this.searchable = searchable;
        this.orderable = orderable;
        this.search = search;
        this.visible = visible;
    }
}
