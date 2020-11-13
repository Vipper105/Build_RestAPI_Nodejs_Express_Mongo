export interface ModificationNote {
  modified_on: Date;
  modified_by: String;
  modification_note: String;
}

export const ModificationNote = {
  modified_on: Date,
  modified_by: String,
  modification_note: String,
};

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  internal_server_error = 500,
  not_found = 404,
  created = 201,
  no_content = 204,
  modified = 304,
  unautorized = 401,
  forbidden = 403,
  not_implement = 501,
}

export enum District { 
  District1 = "District 1",
  District2 = "District 2",
  District3 = "District 3",
  District4 = "District 4",
  District5 = "District 5",
  District6 = "District 6",
  District7 = "District 7",
  District8 = "District 8",
  District9 = "District 9",
  District10 ="District 10",
  District11 ="District 11",
  District12= "District 12",


}