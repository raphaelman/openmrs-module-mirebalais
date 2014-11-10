package org.openmrs.module.mirebalais.config;

import org.junit.Test;
import org.openmrs.test.BaseModuleContextSensitiveTest;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class ConfigTest extends BaseModuleContextSensitiveTest{

    private Config config;

    @Test
    public void testComponentConfiguration() {
        config = new Config();
        assertThat(config.isComponentEnabled("someComponent"), is(true));
        assertThat(config.isComponentEnabled("anotherComponent"), is(true));
        assertThat(config.isComponentEnabled("missingComponent"), is(false));
        assertThat(config.getWelcomeMessage(), is("Hello Mirebalais!"));
        assertThat(config.getSite(), is(ConfigDescriptor.Site.MIREBALAIS));
    }

    @Test
    public void testCustomizingFilenameViaRuntimeProperties() {
        runtimeProperties.setProperty(Config.PIH_CONFIGURATION_RUNTIME_PROPERTY, "custom");
        config = new Config();
        assertThat(config.isComponentEnabled("someComponent"), is(true));
        assertThat(config.isComponentEnabled("anotherComponent"), is(false));
        assertThat(config.isComponentEnabled("customComponent"), is(true));
        assertThat(config.getWelcomeMessage(), is("Hello custom!"));
        assertThat(config.getSite(), is(ConfigDescriptor.Site.LACOLLINE));
        runtimeProperties.remove(Config.PIH_CONFIGURATION_RUNTIME_PROPERTY);
    }

}
