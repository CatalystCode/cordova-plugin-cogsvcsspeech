import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'speechToTextTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../speechToTextTab/speechToText.module').then(m => m.SpeechToTextPageModule)
          }
        ]
      },
      {
        path: 'textToSpeechTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../textToSpeech/textToSpeech.module').then(m => m.TextToSpeechPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/speechToTextTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/speechToTextTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
