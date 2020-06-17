import { Pipe, PipeTransform } from '@angular/core';
import tools from 'src/assets/data/en/tools';

@Pipe({
  name: 'tools'
})

export class ToolsPipe implements PipeTransform {
  tools = tools;

  transform( toolId: string ): any {
    const tool =  tools.filter( tool => tool.id === toolId );
    return  tool.length > 0 ? `assets/img/tools/${ tool[0]['id'] }.svg` :  'assets/img/51.svg';
  }

}
