import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByBrand"
})
export class FilterByBrandPipe implements PipeTransform {
  transform(items: any, select?: any): any {
    console.log("Item s " + items[0].nameAr);
    console.log("Filter Selected: " + select);
    if (select !== "All") {
      return select
        ? items.filter(item => item["category"] === select)
        : items;
    } else {
      return items;
    }
  }
}
