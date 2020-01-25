import { BehaviorSubject } from 'rxjs';

export default class CartController {
    constructor() {
        this.items$ = new BehaviorSubject([]);
        this.total$ = new BehaviorSubject([]);
    }

    getItemsSubject() {
        return this.items$;
    }

    getTotalSubject() {
        return this.total$;
    }

    add(newItem) {
        try {
            const next = this.items$.getValue().splice(0);
            const found = next.reduce((acc,oldItem,index)=>oldItem.id===newItem.id?index:acc,-1);
            if (found>-1) {
                next[found].qty += 1;
            }
            else {
                next.push({
                    name: newItem.name,
                    qty: 1,
                    id: newItem.id,
                    unitCost: newItem.unitCost,
                });
            }
            this.items$.next(next);
            this.total$.next(next.reduce((acc,item)=>acc+(item.qty*item.unitCost),0));
        }
        catch (err) {
            console.error(`Couldn't add item to cart: ${err}`);
        }
    }

    remove(id) {
        const next = this.items$.getValue().filter(item=>item.id!==id);
        this.item$.next(next);
        this.total$.next(next.reduce((acc,item)=>acc+(item.qty*item.unitCost),0));
    }
}
