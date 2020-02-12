import { BehaviorSubject } from 'rxjs';

export default class Controller {
    constructor () {
        this.states = {
            first: 'first',
            ok: 'ok',
            loading: 'loading',
            error: 'error',
        };
        this.results$ = new BehaviorSubject([]);
        this.status$ = new BehaviorSubject(this.states.first);
    }

    GetResultsSubject() {
        return this.results$;
    }

    GetStatusSubject() {
        return this.status$;
    }

    async Clear() {
        this.status$.next(this.states.loading);
        try {
            const rawRes = await fetch(`${process.env.REACT_APP_API_URL}/vehicles/`, {
                mode: 'cors',
            });
            const res = await rawRes.json();
            const remap = res.results.map((item)=>{
                const found = item.url.match(/\/(\d+)\/?$/);
                return {
                    name: item.name,
                    id: found[1],
                    cost_in_credits: item.cost_in_credits,
                };
            });
            this.results$.next(remap);
            this.status$.next(this.states.ok);
        }
        catch (err) {
            this.status$.next(this.states.error);
            console.error(err);
        }
    }

    async Search(rawSpec) {
        const spec = rawSpec.trim();
        if (spec !=='') {
            this.status$.next(this.states.loading);
            try {
                const rawRes = await fetch(`${process.env.REACT_APP_API_URL}/vehicles/?search=${spec}`,{
                    mode: 'cors'
                });
                const res = await rawRes.json();
                const remap = res.results.map((item)=>{
                    const found = item.url.match(/\/(\d+)\/?$/);
                    return {
                        name: item.name,
                        id: found[1],
                        cost_in_credits: item.cost_in_credits,
                    };
                });
                this.results$.next(remap);
                this.status$.next(this.states.ok);
            }
            catch (err) {
                this.status$.next(this.states.error);
                console.error(err);
            }
        }
        else {
            this.Clear();
        }
    }

}