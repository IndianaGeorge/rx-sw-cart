import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, act, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => fetchImplementationFactory({
    results: [
      {
        name: 'test vehicle',
        cost_in_credits: 1,
        url: `${process.env.REACT_APP_API_URL}/vehicles/1/`,
      }
    ]
  }));
});

afterEach(() => {
  global.fetch.mockClear();
  cleanup();
});

const fetchImplementationFactory = (response) => {
  const mockJsonPromise = Promise.resolve(response);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
}

describe('App', ()=> {


  it('Has a search field and shows list', async ()=>{
    let root;
    await act(async ()=>{
      root = render(<App />);
    });
    const inputField = root.getByRole('search');
    expect (inputField).toBeInTheDocument();
    const searchResult = root.getByText('test vehicle');
    expect (searchResult).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/vehicles/`,{"mode":"cors"});
  });


  it('Triggers a search with enter key and shows results', async ()=>{
    let root;
    await act(async ()=>{
      root = render(<App />);
    });
    const searchForm = root.getByRole("search");
    const searchField = root.getByRole('searchbox');
    expect (searchField).toBeInTheDocument();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => fetchImplementationFactory(
      {results: [
        {
          name: 'result of search',
          cost_in_credits: 2,
          url: `${process.env.REACT_APP_API_URL}/vehicles/2/`
        }
      ]}
    ));
    await act(async ()=>{
      fireEvent.change(searchField,{
        target: {
          value: "mysearchstring"
        }
      });
    });
    expect(searchField.value).toBe("mysearchstring");
    await act(async ()=>{
      fireEvent.submit(searchForm);
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenLastCalledWith(`${process.env.REACT_APP_API_URL}/vehicles/?search=mysearchstring`,{"mode":"cors"});
    const searchResult = root.getByText('result of search');
    expect(searchResult).toBeInTheDocument();
  });


  it('Triggers a search with search button and shows results', async ()=>{
    let root;
    await act(async ()=>{
      root = render(<App />);
    });
    const searchButton = root.getByText("Search!");
    const searchField = root.getByRole('searchbox');
    expect (searchField).toBeInTheDocument();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => fetchImplementationFactory(
      {results: [
        {
          name: 'result of search',
          cost_in_credits: 2,
          url: `${process.env.REACT_APP_API_URL}/vehicles/2/`
        }
      ]}
    ));
    await act(async ()=>{
      fireEvent.change(searchField,{
        target: {
          value: "mysearchstring"
        }
      });
    });
    expect(searchField.value).toBe("mysearchstring");
    await act(async ()=>{
      fireEvent.click(searchButton);
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenLastCalledWith(`${process.env.REACT_APP_API_URL}/vehicles/?search=mysearchstring`,{"mode":"cors"});
    const searchResult = root.getByText('result of search');
    expect(searchResult).toBeInTheDocument();
  });


  it('Shows item details', async ()=>{
    let root;
    await act(async ()=>{
      root = render(<App />, { wrapper: MemoryRouter });
    });
    const item = root.getByRole("gridcell");
    expect(item).toBeInTheDocument();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => fetchImplementationFactory({
      name:"vehiclename",
      model:"vehiclemodel",
      manufacturer:"vehiclemanufacturer",
      cost_in_credits:"999",
      length:"vehiclelength",
      max_atmosphering_speed:"vehiclespeed",
      crew:"vehiclecrew",
      passengers:"vehiclepassengers",
      cargo_capacity:"vehiclecargocapacity",
      consumables:"vehicleconsumables",
      vehicle_class:"vehicleclass",
      pilots:[],
      films:[`${process.env.REACT_APP_API_URL}/films/1/`],
      created:"2014-12-10T16:01:52.434000Z",
      edited:"2014-12-22T18:21:15.552614Z",
      url:`${process.env.REACT_APP_API_URL}/vehicles/6/`,
  }));  
    await act(async ()=>{
      fireEvent.click(item);
    });
    expect(root.getByText("Manufacturer").nextElementSibling.textContent).toBe("vehiclemanufacturer");
    expect(root.getByText("Length").nextElementSibling.textContent).toBe("vehiclelength");
    expect(root.getByText("Crew").nextElementSibling.textContent).toBe("vehiclecrew");
    expect(root.getByText("Passengers").nextElementSibling.textContent).toBe("vehiclepassengers");
    expect(root.getByText("Cargo Capacity").nextElementSibling.textContent).toBe("vehiclecargocapacity");
    expect(root.getByText("Consumables").nextElementSibling.textContent).toBe("vehicleconsumables");
    expect(root.getByText("Class").nextElementSibling.textContent).toBe("vehicleclass");
    expect(root.getByText("Add to cart")).toBeInTheDocument();
    expect(root.getByTestId("price").textContent).toBe("999");
  });

  it('Adds item to cart', async ()=>{
    let root;
    await act(async ()=>{
      root = render(
        <MemoryRouter>
          <Route path="/">
            <App />
          </Route>
        </MemoryRouter>,
        {route: '/'}
      );
    });
    const item = root.getByRole("gridcell");
    expect(item).toBeInTheDocument();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => fetchImplementationFactory({
      name:"vehiclename",
      model:"vehiclemodel",
      manufacturer:"vehiclemanufacturer",
      cost_in_credits:"999",
      length:"vehiclelength",
      max_atmosphering_speed:"vehiclespeed",
      crew:"vehiclecrew",
      passengers:"vehiclepassengers",
      cargo_capacity:"vehiclecargocapacity",
      consumables:"vehicleconsumables",
      vehicle_class:"vehicleclass",
      pilots:[],
      films:[`${process.env.REACT_APP_API_URL}/films/1/`],
      created:"2014-12-10T16:01:52.434000Z",
      edited:"2014-12-22T18:21:15.552614Z",
      url:`${process.env.REACT_APP_API_URL}/vehicles/6/`,
  }));  
    await act(async ()=>{
      fireEvent.click(item);
    });
    const addButton = root.getByText("Add to cart");
    await act(async ()=>{
      fireEvent.click(addButton);
    });
    const cartPrice = root.getByText("Total: 999 credits");
    expect(cartPrice).toBeInTheDocument();
  });

});

