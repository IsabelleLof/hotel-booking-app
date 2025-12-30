declare module 'amadeus' {
  export default class Amadeus {
    constructor(options: { clientId: string; clientSecret: string });
    referenceData: {
      locations: {
        get(params: any): Promise<any>;
        hotels: {
          byCity: {
            get(params: any): Promise<any>;
          };
        };
      };
    };
    shopping: {
      hotelOffersSearch: {
        get(params: any): Promise<any>;
      };
      hotelOffersByHotel: {
        get(params: any): Promise<any>;
      };
    };
  }
}
