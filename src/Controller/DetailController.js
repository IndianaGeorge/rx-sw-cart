import { BehaviorSubject } from 'rxjs';

export default class Controller {
    constructor() {
        this.states = {
            first: 'first',
            ok: 'ok',
            error: 'error',
            loading: 'loading',
        };
        this.detail$ = new BehaviorSubject({});
        this.status$ = new BehaviorSubject(this.states.first);
    }

    getDetailSubject() {
        return this.detail$;
    }

    getStatusSubject() {
        return this.status$;
    }

    async getDetail(id) {
        this.status$.next(this.states.loading);
        try {
            const rawRes = await fetch(`${process.env.REACT_APP_API_URL}/vehicles/${id}`,{
                mode: 'cors'
            });
            const res = await rawRes.json();
            this.detail$.next(res);
            this.status$.next(this.states.ok);
        }
        catch(err) {
            this.status$.next(this.states.error)
        }
    }
}