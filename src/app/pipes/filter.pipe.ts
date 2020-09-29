import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPost = [];
    for(const post of value){
      if(post.ubicacion.toLowerCase().indexOf(args.toLowerCase()) > -1 
      || post.posicion.toLowerCase().indexOf(args.toLowerCase()) > -1 
      || post.compania.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resultPost.push(post);

      }
    }
    return resultPost;
  }

}
