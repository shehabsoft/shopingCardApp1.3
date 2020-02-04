import { Pipe, PipeTransform } from "@angular/core";
import { ProductsSeller } from "../models/productsSeller";

@Pipe({
  name: "filterByBrand"
})
export class FilterByBrandPipe implements PipeTransform {
  transform(items: ProductsSeller[], select?: any): any {
  //  console.log("Item s " + items[0].product);
    console.log("Filter Selected: " + select);
    if (select !== "All") {
      return select
        ? items.filter(item => item.product.category === select)
        : items;
    } else {
      return items;
    }
  }
}
