import m from 'mithril';
import _ from 'underscore';
import projectDashboardMenu from '../c/project-dashboard-menu';
import {
    catarse
} from '../api';
import projectsContributionReportVM from '../vms/projects-contribution-report-vm';
import h from '../h';
import models from '../models';

const projectSubscriptionReportDownload = {
    controller(args) {
        const catarseVM = projectsContributionReportVM;
        const project = m.prop([{}]);
        catarseVM.project_id(args.project_id);
        const lProject = catarse.loaderWithToken(models.projectDetail.getPageOptions({
            project_id: `eq.${catarseVM.project_id()}`
        }));

        lProject.load().then((data) => {
            project(data);
        });
        return {
            project
        };
    },
    view(ctrl, args) {
        return m('.section.project-metrics',
            m('.w-container',
                m('.w-row', [
                    m.component(projectDashboardMenu, {
                        project: m.prop(_.first(ctrl.project()))
                    }),
                    m('.w-col.w-col-2'),
                    m('.w-col.w-col-8',
                        m('.card.u-radius.u-marginbottom-20.card-terciary', [
                            m('.fontsize-small.fontweight-semibold.u-marginbottom-20', [
                                m('span.fa.fa-download',
                                    m.trust('&nbsp;')
                                ),
                                'Baixar relatórios'
                            ]),
                            m('.card.u-radius.u-marginbottom-20', [
                                m('span.fontweight-semibold',
                                    m.trust('Atenção:')
                                ),
                                'Ao realizar o download desses dados, você se compromete a armazená-los em local seguro e respeitar o direitos dos usuários conforme o que está previsto nos Termos de Uso e na política de privacidade do Catarse.'
                            ]),
                            m('ul.w-list-unstyled', [
                                m('li.fontsize-smaller.u-marginbottom-10',
                                    m('div', [
                                        'Base de assinantes ',
                                        m.trust('&nbsp;'),
                                        m(`a.alt-link[href='/projects/${args.project_id}/subscriptions_report_for_project_owners.csv']`,
                                            'CSV'
                                        ),
                                        m.trust('&nbsp;'),
                                        '\\',
                                        m.trust('&nbsp;'),
                                        m(`a.alt-link[href='/projects/${args.project_id}/subscriptions_report_for_project_owners.xls']`,
                                            'XLS'
                                        )
                                    ])
                                ),
                                m('li.divider.u-marginbottom-10'),
                                m('li.fontsize-smaller.u-marginbottom-10',
                                    m('div', [
                                        `Relatório de apoios confirmados`,
                                        m.trust('&nbsp;'),
                                        m.trust('&nbsp;'),
                                        m(`a.alt-link[href='/projects/${args.project_id}/subscriptions_monthly_report_for_project_owners.csv']`,
                                            'CSV'
                                        ),
                                        m.trust('&nbsp;'),
                                        '\\',
                                        m.trust('&nbsp;'),
                                        m(`a.alt-link[href='/projects/${args.project_id}/subscriptions_monthly_report_for_project_owners.xls']`,
                                            'XLS'
                                        )
                                    ])
                                )
                            ])
                        ])
                    ),
                    m('.w-col.w-col-2')
                ])
            )
        );
    }
};

export default projectSubscriptionReportDownload;
