import { Block, Link, ScrollView, Grid, Flexbox, Header, Paragraph } from '@flow-ui/core'
import { HomePageProps } from '@flow-ui/documaker/core'
import Lottie from 'react-lottie'

const components = ['Table', 'Meter']

export default () => {
    return (
        <Flexbox justifyContent="center" backgroundColor="#000000">
            <Block w="64rem" textColor="#ffffff" css={{
                maxWidth: '64rem'
            }}>
                <Flexbox 
                    p="2rem"
                    justifyContent="space-between"
                    css={{
                        '@media(max-width:620px)': {
                            flexDirection: 'column-reverse',
                            alignItems: 'center',
                            textAlign: 'center',
                        }
                    }}
                >
                    <Block flex={1}>
                        <Header size="xl" children="Data" />
                        <Paragraph
                            size="l"
                            children="Visual presentation of information"
                        />
                        <Flexbox wrap="wrap">
                            {components.map((name, index) => 
                                <Link
                                    key={name}
                                    children={name}
                                    p="0.25rem 0.5rem"
                                    m="0.25rem"
                                    borderRadius="0.25rem"
                                    textColor="#000000"
                                    backgroundColor="#ffffff"
                                />
                            )}
                        </Flexbox>
                    </Block>
                    <Lottie
                        width="15rem"
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: require('./animation.json'),
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                    />
                </Flexbox>
            </Block>
        </Flexbox>
    )
}