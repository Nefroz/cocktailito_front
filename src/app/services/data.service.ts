import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private apiURL = environment.apiURL
  
  constructor(private http: HttpClient) {}

  //cocktailito

  fetchRessources(entity) { //fetch all ressources
    return this.http.get(this.apiURL+entity+'/ressources');
  }

  fetchRessource(entity, focus) { // fetch one ressource
    return this.http.get(this.apiURL+entity+'/ressources/'+focus);
  }

  fetchCocktails(entity) { //fetch all cocktails
    return this.http.get(this.apiURL+entity+'/cocktails');
  }

  fetchCocktail(entity, focus) { // fetch one cocktail
    return this.http.get(this.apiURL+entity+'/cocktails/'+focus);
  }

  fetchUsers(entity) { // fetch all users
    return this.http.get(this.apiURL+entity+'/users');
  }

  fetchUser(entity, focus) { // fetch one user
    return this.http.get(this.apiURL+entity+'/users/'+focus);
  }

  fetchViews(entity) { //fetch all views
    return this.http.get(this.apiURL+entity+'/views');
  }

  fetchArticles(entity) { //fetch all articles
    return this.http.get(this.apiURL+entity+'/articles');
  }

  fetchArticle(entity, focus) { // fetch one article
    return this.http.get(this.apiURL+entity+'/articles/'+focus);
  }

  fetchRessourcesCocktails(entity) { //fetch all links between Ressources and Cocktails
    return this.http.get(this.apiURL+entity+'/ressourcescocktails');
  }

  fetchRessourceCocktail(entity, focus) { // fetch one link between Ressources and Cocktails
    return this.http.get(this.apiURL+entity+'/ressourcescocktails/'+focus);
  }

  fetchCocktailsUsers(entity) { // fetch all links between Cocktails and Users
    return this.http.get(this.apiURL+entity+'/cocktailsusers');
  }

  fetchCocktailUser(entity, focus) { // fetch one link between Cocktails and Users
    return this.http.get(this.apiURL+entity+'/cocktailsusers/'+focus);
  }



  postRessource(entity, body) { // post one ressource
    return this.http.post<any>(this.apiURL+entity+'/ressources', body);
  }

  postCocktail(entity, body) { // post one cocktail
    return this.http.post<any>(this.apiURL+entity+'/cocktails', body);
  }

  postContact(entity, body) { // post one cocktail
    return this.http.post<any>(this.apiURL+entity+'/contacts', body);
  }

  postUser(entity, body) { // post one user
    return this.http.post<any>(this.apiURL+entity+'/users', body);
  }

  postView(entity, body) { // post one view
    return this.http.post<any>(this.apiURL+entity+'/views', body);
  }

  postArticle(entity, body) { // post one article
    return this.http.post<any>(this.apiURL+entity+'/articles', body);
  }

  postRessourceCocktail(entity, body) { // post one link between Ressources and Cocktails
    return this.http.post<any>(this.apiURL+entity+'/ressourcescocktails', body);
  }

  postCocktailUser(entity, body) { // post one link between Cocktails and Users
    return this.http.post<any>(this.apiURL+entity+'/cocktailsusers', body);
  }



  putRessource(entity, focus, body) { // put one ressource
    return this.http.put<any>(this.apiURL+entity+'/ressources/'+focus, body);
  }

  putCocktail(entity, focus, body) { // put one cocktail
    return this.http.put<any>(this.apiURL+entity+'/cocktails/'+focus, body);
  }

  putUser(entity, focus, body) { // put one user
    return this.http.put<any>(this.apiURL+entity+'/users/'+focus, body);
  }

  putView(entity, focus, body) { // put one view
    return this.http.put<any>(this.apiURL+entity+'/views/'+focus, body);
  }

  putArticle(entity, focus, body) { // put one article
    return this.http.put<any>(this.apiURL+entity+'/articles/'+focus, body);
  }

  putRessourceCocktail(entity, focus, body) { // put one link between ressource and cocktail
    return this.http.put<any>(this.apiURL+entity+'/ressourcescocktails/'+focus, body);
  }

  putCocktailUser(entity, focus, body) { // put one link between cocktail and ressource
    return this.http.put<any>(this.apiURL+entity+'/cocktailsusers/'+focus, body);
  }



  deleteRessource(entity, focus) { // delete a ressource
    return this.http.delete<any>(this.apiURL+entity+'/ressources/'+focus);
  }

  deleteCocktail(entity, focus) { // delete a cocktail
    return this.http.delete<any>(this.apiURL+entity+'/cocktails/'+focus);
  }

  deleteUser(entity, focus) { // delete an user
    return this.http.delete<any>(this.apiURL+entity+'/users/'+focus);
  }

  deleteView(entity, focus) { // delete a view
    return this.http.delete<any>(this.apiURL+entity+'/views/'+focus);
  }

  deleteArticle(entity, focus) { // delete an article
    return this.http.delete<any>(this.apiURL+entity+'/article/'+focus);
  }

  deleteRessourceCocktail(entity, focus) { // delete a link between ressource and cocktail
    return this.http.delete<any>(this.apiURL+entity+'/ressourcescocktails/'+focus);
  }

  deleteCocktailUser(entity, focus) { // delete a link between cocktail and user
    return this.http.delete<any>(this.apiURL+entity+'/cocktailsusers/'+focus);
  }





  //imobi


  fetchAddresses(entity) {
    return this.http.get(this.apiURL+entity+'/addresses');
  }

  fetchConfiguration(entity) {
    return this.http.get(this.apiURL+entity+'/configuration');
  }

  fetchCustomers(entity) {
    return this.http.get(this.apiURL+entity+'/customers');
  }

  //Non opérationnel atm
  fetchUsersSimplified(entity) {
    return this.http.get(this.apiURL+entity+'/userssimplified');
  }

  //Non opérationnel atm
  fetchRessourcesSimplified(entity) {
    return this.http.get(this.apiURL+entity+'/ressourcessimplified');
  }

  fetchPricings(entity){
    return this.http.get(this.apiURL+entity+'/pricings');
  }

  fetchPricingsSimplified(entity) {
    return this.http.get(this.apiURL+entity+'/pricingssimplified');
  }

  fetchPricing(entity, focus) {
    return this.http.get(this.apiURL+entity+'/pricings/'+focus);
  }

  fetchRules(entity){
    return this.http.get(this.apiURL+entity+'/rules');
  }

  fetchRule(entity, focus) {
    return this.http.get(this.apiURL+entity+'/rules/'+focus);
  }

  fetchUnavailibilities(entity){
    return this.http.get(this.apiURL+entity+'/unavailibilities');
  }

  fetchUnavailibility(entity, focus) {
    return this.http.get(this.apiURL+entity+'/unavailibilities/'+focus);
  }

  fetchTypes(entity){
    return this.http.get(this.apiURL+entity+'/types');
  }

  fetchType(entity, focus) {
    return this.http.get(this.apiURL+entity+'/types/'+focus);
  }

  fetchReservations(entity){
    return this.http.get(this.apiURL+entity+'/reservations');
  }

  fetchReservation(entity, focus) {
    return this.http.get(this.apiURL+entity+'/reservations/'+focus);
  }

  fetchActivities(entity){
    return this.http.get(this.apiURL+entity+'/activities');
  }

  fetchActivity(entity, focus) {
    return this.http.get(this.apiURL+entity+'/activities/'+focus);
  }

  fetchDetails(entity) {
    return this.http.get(this.apiURL+entity+'/details');
  }

  fetchFiles(entity) {
    return this.http.get(this.apiURL+entity+'/files');
  }

  postCustomer(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/customers', body);
  }

  postConfiguration(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/configuration', body);
  }

  postPricing(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/pricings', body);
  }

  postRule(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/rules', body);
  }

  postUnavailibility(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/unavailibilities', body);
  }

  postType(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/types', body);
  }

  postReservation(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/reservations', body);
  }

  postActivity(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/activities', body);
  }

  postDetail(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/details', body);
  }

  postFile(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/files', body);
  }

  postAddress(entity, body) {
    return this.http.post<any>(this.apiURL+entity+'/addresses', body);
  }

  putCustomer(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/customers/'+focus, body);
  }

  putConfiguration(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/configuration/'+focus, body);
  }

  putPricing(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/pricings/'+focus, body);
  }

  putRule(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/rules/'+focus, body);
  }

  putType(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/types/'+focus, body);
  }

  putReservation(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/reservations/'+focus, body);
  }

  putActivity(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/activities/'+focus, body);
  }

  putDetails(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/details/'+focus, body);
  }

  putFile(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/files/'+focus, body);
  }

  putUnavailibilities(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/unavailibilities/'+focus, body);
  }

  putAddress(entity, focus, body) {
    return this.http.put<any>(this.apiURL+entity+'/addresses/'+focus, body);
  }

  deleteCustomer(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/customers/'+focus);
  }

  deleteConfiguration(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/users/'+focus);
  }

  deletePricing(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/pricings/'+focus);
  }

  deleteRule(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/rules/'+focus);
  }

  deleteUnavailibility(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/unavailibilities/'+focus);
  }

  deleteType(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/types/'+focus);
  }

  deleteReservation(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/reservations/'+focus);
  }

  deleteActivity(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/activities/'+focus);
  }

  deleteDetail(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/details/'+focus);
  }

  deleteFile(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/files/'+focus);
  }

  deleteAddress(entity, focus) {
    return this.http.delete<any>(this.apiURL+entity+'/addresses/'+focus);
  }
}